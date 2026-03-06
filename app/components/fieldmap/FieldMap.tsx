"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  HOTSPOTS,
  type FieldMapHotspot,
  type FieldMapPoint,
} from "./fieldMapHotspots";

type ImageBox = {
  width: number;
  height: number;
};

const STORAGE_KEY = "fieldmap-hotspots-v1.6";
const FIELD_MAP_ASSET = "/fieldmap/field-map-v1_6.jpg?v=20260303";
const TOOLTIP_WIDTH = 320;
const TOOLTIP_HEIGHT = 232;
const TOOLTIP_OFFSET = 18;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function polygonArea(points: FieldMapPoint[]) {
  if (points.length < 3) return Number.POSITIVE_INFINITY;
  let area = 0;

  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    area += current.x * next.y - next.x * current.y;
  }

  return Math.abs(area) / 2;
}

function pointInPolygon(point: FieldMapPoint, polygon: FieldMapPoint[]) {
  if (polygon.length < 3) return false;

  let isInside = false;

  for (
    let currentIndex = 0, previousIndex = polygon.length - 1;
    currentIndex < polygon.length;
    previousIndex = currentIndex, currentIndex += 1
  ) {
    const currentPoint = polygon[currentIndex];
    const previousPoint = polygon[previousIndex];
    const intersects =
      currentPoint.y > point.y !== previousPoint.y > point.y &&
      point.x <
        ((previousPoint.x - currentPoint.x) * (point.y - currentPoint.y)) /
          (previousPoint.y - currentPoint.y) +
          currentPoint.x;

    if (intersects) {
      isInside = !isInside;
    }
  }

  return isInside;
}

function mergeSavedHotspots(
  saved: unknown,
  fallback: FieldMapHotspot[]
): FieldMapHotspot[] {
  if (!Array.isArray(saved)) return fallback;

  return fallback.map((hotspot) => {
    const match = saved.find(
      (entry) =>
        typeof entry === "object" &&
        entry !== null &&
        "id" in entry &&
        entry.id === hotspot.id &&
        "polygon" in entry &&
        Array.isArray(entry.polygon)
    ) as { polygon: FieldMapPoint[] } | undefined;

    if (!match) return hotspot;

    return {
      ...hotspot,
      polygon: match.polygon
        .filter(
          (point) =>
            typeof point?.x === "number" && typeof point?.y === "number"
        )
        .map((point) => ({
          x: clamp(point.x, 0, 1),
          y: clamp(point.y, 0, 1),
        })),
    };
  });
}

function distance(first: FieldMapPoint, second: FieldMapPoint) {
  const deltaX = first.x - second.x;
  const deltaY = first.y - second.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function pointsToString(points: FieldMapPoint[]) {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

function polygonCentroid(points: FieldMapPoint[]) {
  if (!points.length) {
    return { x: 0.5, y: 0.5 };
  }

  const totals = points.reduce(
    (accumulator, point) => ({
      x: accumulator.x + point.x,
      y: accumulator.y + point.y,
    }),
    { x: 0, y: 0 }
  );

  return {
    x: totals.x / points.length,
    y: totals.y / points.length,
  };
}

export default function FieldMap() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pendingClientPointRef = useRef<{ x: number; y: number } | null>(null);

  const [hotspots, setHotspots] = useState(HOTSPOTS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [calibrationZoneId, setCalibrationZoneId] = useState(HOTSPOTS[0].id);
  const [canHover, setCanHover] = useState(false);
  const [imageBox, setImageBox] = useState<ImageBox | null>(null);
  const [pointer, setPointer] = useState<FieldMapPoint | null>(null);
  const [status, setStatus] = useState("Calibration ready.");
  const [calibrate, setCalibrate] = useState(false);
  const [debug, setDebug] = useState(false);

  const resolveHit = useCallback(
    (point: FieldMapPoint | null) => {
      if (!point) return null;

      const hits = hotspots.filter((hotspot) =>
        pointInPolygon(point, hotspot.polygon)
      );

      if (!hits.length) return null;

      return hits.sort(
        (left, right) => polygonArea(left.polygon) - polygonArea(right.polygon)
      )[0];
    },
    [hotspots]
  );

  const activeHotspot = useMemo(() => {
    const activeId = canHover ? hoveredId ?? selectedId : selectedId;
    return hotspots.find((hotspot) => hotspot.id === activeId) ?? null;
  }, [canHover, hoveredId, selectedId, hotspots]);

  const debugHit = useMemo(() => resolveHit(pointer), [pointer, resolveHit]);

  const updateImageBox = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const imageRect = stage.getBoundingClientRect();
    setImageBox({
      width: imageRect.width,
      height: imageRect.height,
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handleChange = () => setCanHover(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCalibrate(params.get("calibrate") === "1");
    setDebug(params.get("debug") === "1");
  }, []);

  useEffect(() => {
    if (!calibrate) return;

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      setHotspots(mergeSavedHotspots(JSON.parse(saved), HOTSPOTS));
      setStatus("Loaded saved calibration from localStorage.");
    } catch {
      setStatus("Saved calibration could not be read.");
    }
  }, [calibrate]);

  useEffect(() => {
    updateImageBox();
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(() => updateImageBox());
    observer.observe(stage);
    return () => observer.disconnect();
  }, [updateImageBox]);

  useEffect(() => {
    if (canHover || !selectedId) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setSelectedId(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [canHover, selectedId]);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const getNormalizedPoint = useCallback(
    (clientX: number, clientY: number) => {
      const stage = stageRef.current;
      if (!stage || !imageBox) return null;

      const rect = stage.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;

      if (
        relativeX < 0 ||
        relativeY < 0 ||
        relativeX > imageBox.width ||
        relativeY > imageBox.height
      ) {
        return null;
      }

      return {
        x: clamp(relativeX / imageBox.width, 0, 1),
        y: clamp(relativeY / imageBox.height, 0, 1),
      };
    },
    [imageBox]
  );

  const commitPointer = useCallback(
    (clientX: number, clientY: number) => {
      const normalizedPoint = getNormalizedPoint(clientX, clientY);
      setPointer(normalizedPoint);

      if (!canHover) return;

      const hit = resolveHit(normalizedPoint);
      setHoveredId(hit?.id ?? null);
    },
    [canHover, getNormalizedPoint, resolveHit]
  );

  const queuePointerUpdate = useCallback(
    (clientX: number, clientY: number) => {
      pendingClientPointRef.current = { x: clientX, y: clientY };

      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        const nextPoint = pendingClientPointRef.current;
        frameRef.current = null;
        pendingClientPointRef.current = null;
        if (!nextPoint) return;
        commitPointer(nextPoint.x, nextPoint.y);
      });
    },
    [commitPointer]
  );

  const updateHotspotPolygon = useCallback(
    (zoneId: string, updater: (polygon: FieldMapPoint[]) => FieldMapPoint[]) => {
      setHotspots((currentHotspots) =>
        currentHotspots.map((hotspot) =>
          hotspot.id === zoneId
            ? { ...hotspot, polygon: updater(hotspot.polygon) }
            : hotspot
        )
      );
    },
    []
  );

  const handleStagePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (calibrate) return;

    const normalizedPoint = getNormalizedPoint(event.clientX, event.clientY);
    const hit = resolveHit(normalizedPoint);

    if (canHover) {
      if (hit) setSelectedId(hit.id);
      return;
    }

    setSelectedId((currentId) => {
      if (!hit) return null;
      return currentId === hit.id ? null : hit.id;
    });
  };

  const handleStageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!calibrate) return;

    const normalizedPoint = getNormalizedPoint(event.clientX, event.clientY);
    if (!normalizedPoint) {
      setStatus("Click inside the displayed map to add a point.");
      return;
    }

    const activeZone = hotspots.find(
      (hotspot) => hotspot.id === calibrationZoneId
    );
    if (!activeZone) return;

    const firstPoint = activeZone.polygon[0];
    if (
      firstPoint &&
      activeZone.polygon.length >= 3 &&
      distance(firstPoint, normalizedPoint) < 0.02
    ) {
      setStatus(`Closed ${activeZone.label} near the first point.`);
      return;
    }

    updateHotspotPolygon(calibrationZoneId, (polygon) => [
      ...polygon,
      normalizedPoint,
    ]);
    setStatus(`Added point ${activeZone.polygon.length + 1} to ${activeZone.label}.`);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(hotspots, null, 2));
      setStatus("Copied hotspot JSON to clipboard.");
    } catch {
      setStatus("Clipboard copy failed.");
    }
  };

  const handleSave = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(hotspots));
    setStatus("Saved hotspot JSON to localStorage.");
  };

  const tooltipPosition = useMemo(() => {
    if (!activeHotspot || !imageBox || !stageRef.current) return null;

    const stage = stageRef.current;
    const stageWidth = stage.clientWidth;
    const stageHeight = stage.clientHeight;
    const anchor = pointer ?? polygonCentroid(activeHotspot.polygon);
    const anchorX = anchor.x * imageBox.width;
    const anchorY = anchor.y * imageBox.height;

    let left = anchorX + TOOLTIP_OFFSET;
    let top = anchorY + TOOLTIP_OFFSET;

    if (left + TOOLTIP_WIDTH > stageWidth - 12) {
      left = anchorX - TOOLTIP_WIDTH - TOOLTIP_OFFSET;
    }

    if (top + TOOLTIP_HEIGHT > stageHeight - 12) {
      top = anchorY - TOOLTIP_HEIGHT - TOOLTIP_OFFSET;
    }

    return {
      left: clamp(left, 12, Math.max(12, stageWidth - TOOLTIP_WIDTH - 12)),
      top: clamp(top, 12, Math.max(12, stageHeight - TOOLTIP_HEIGHT - 12)),
    };
  }, [activeHotspot, imageBox, pointer]);

  return (
    <section ref={rootRef} className="mx-auto w-full max-w-[1140px] px-6 lg:px-8">
      <div className="rounded-[16px] border border-white/10 bg-zinc-950 shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
        <div
          ref={stageRef}
          className="relative overflow-hidden rounded-[16px]"
          onPointerMove={(event) => {
            if (event.pointerType === "touch") return;
            queuePointerUpdate(event.clientX, event.clientY);
          }}
          onPointerLeave={() => {
            setPointer(null);
            if (canHover) setHoveredId(null);
          }}
          onPointerDown={handleStagePointerDown}
          onClick={handleStageClick}
        >
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.08)_100%)]" />
          <img
            ref={imageRef}
            src={FIELD_MAP_ASSET}
            alt="Field map v1.6"
            className="block h-auto w-full"
            onLoad={() => {
              window.requestAnimationFrame(() => updateImageBox());
            }}
          />
        

        {imageBox ? (
          <>
            <div className="pointer-events-none absolute inset-0 z-[1] rounded-[14px] border border-white/12 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),inset_0_0_38px_rgba(0,0,0,0.06)]" />
            <svg
              viewBox="0 0 1 1"
              preserveAspectRatio="none"
              className="absolute inset-0 z-[2] h-full w-full"
            >
              {hotspots.map((hotspot) => {
                const isActive = activeHotspot?.id === hotspot.id;
                const isDebugHit = debugHit?.id === hotspot.id;
                const isCalibrationTarget = calibrationZoneId === hotspot.id;

                return (
                  <polygon
                    key={hotspot.id}
                    points={pointsToString(hotspot.polygon)}
                    fill={
                      calibrate
                        ? isCalibrationTarget
                          ? "rgba(251,191,36,0.12)"
                          : "rgba(251,191,36,0.04)"
                        : isActive || isDebugHit
                        ? "rgba(251,191,36,0.06)"
                        : "rgba(255,255,255,0.01)"
                    }
                    stroke={
                      calibrate || isActive || isDebugHit
                        ? "rgba(251,191,36,0.45)"
                        : "rgba(255,255,255,0.14)"
                    }
                    strokeWidth={calibrate ? 0.004 : 0.0028}
                  />
                );
              })}
            </svg>
          </>
        ) : null}

        {!calibrate && activeHotspot && tooltipPosition ? (
          <div
            className="pointer-events-none absolute z-10 w-[320px] max-w-[calc(100%-24px)] rounded-[16px] border border-white/10 bg-zinc-950/94 p-4 text-left shadow-[0_12px_32px_rgba(0,0,0,0.34)] backdrop-blur-[6px]"
            style={{
              left: tooltipPosition.left,
              top: tooltipPosition.top,
            }}
          >
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Operator Panel
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-100">
              {activeHotspot.label}
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              {activeHotspot.body}
            </p>
            <div className="mt-4">
              <Link
                href={activeHotspot.href}
                className="pointer-events-auto inline-flex items-center rounded-md border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                {activeHotspot.ctaLabel}
              </Link>
            </div>
          </div>
        ) : null}

        {(calibrate || debug) && pointer ? (
          <div className="absolute left-3 top-3 rounded-md border border-neutral-200 bg-white/95 px-3 py-2 text-xs text-neutral-600 shadow-sm">
            <div>
              x: {pointer.x.toFixed(3)} y: {pointer.y.toFixed(3)}
            </div>
            {debug ? (
              <div className="mt-1 text-neutral-900">
                hit: {debugHit?.label ?? "none"}
              </div>
            ) : null}
          </div>
        ) : null}

        {calibrate ? (
          <div className="absolute right-3 top-3 w-[280px] rounded-xl border border-neutral-200 bg-white/96 p-3 text-xs text-neutral-600 shadow-sm">
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Active zone
              </span>
              <select
                value={calibrationZoneId}
                onChange={(event) => setCalibrationZoneId(event.target.value)}
                className="w-full rounded-md border border-neutral-200 bg-white px-2 py-2 text-sm text-neutral-900"
              >
                {hotspots.map((hotspot) => (
                  <option key={hotspot.id} value={hotspot.id}>
                    {hotspot.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  updateHotspotPolygon(calibrationZoneId, (polygon) =>
                    polygon.slice(0, -1)
                  );
                  setStatus("Removed last point.");
                }}
                className="rounded-md border border-neutral-200 px-3 py-2 text-neutral-900"
              >
                Undo last point
              </button>
              <button
                type="button"
                onClick={() => {
                  updateHotspotPolygon(calibrationZoneId, () => []);
                  setStatus("Cleared zone polygon.");
                }}
                className="rounded-md border border-neutral-200 px-3 py-2 text-neutral-900"
              >
                Clear zone
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-md border border-neutral-200 px-3 py-2 text-neutral-900"
              >
                Copy JSON
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-md border border-neutral-200 px-3 py-2 text-neutral-900"
              >
                Save localStorage
              </button>
            </div>

            <div className="mt-3 text-[11px] leading-5 text-neutral-500">
              Click inside the displayed map to add points to the selected
              polygon. Overlapping hits resolve to the smallest polygon area.
            </div>
            <div className="mt-2 text-[11px] text-neutral-700">{status}</div>
          </div>
        ) : null}
        </div>
      </div>
    </section>
  );
}
