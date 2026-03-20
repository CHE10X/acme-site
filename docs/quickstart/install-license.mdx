---
title: Installing Your License
description: How to install and verify your Acme license file
---

# Installing Your License

When you purchase an Acme product, you'll receive a `license.json` file via email. This file unlocks the product on your machine.

---

## Step 1: Save the License File

Save the attached `license.json` to the standard location:

```bash
mkdir -p ~/.acme
mv ~/Downloads/license.json ~/.acme/license.json
```

The license verifier checks these locations in order (first found wins):

| Location | Notes |
|----------|-------|
| `$ACME_LICENSE_PATH` | Environment variable override — useful for CI/testing |
| `~/.acme/license.json` | **Standard location** — use this |
| `/etc/acme/license.json` | System-wide install |
| `./license.json` | Local/dev override |

---

## Step 2: Verify the License

Run the license verifier directly to confirm it's valid:

```bash
python3 ~/.openclaw/workspace/acme-ops/acme_license.py --status
```

Expected output:

```
✅ License valid
   ID:      ACME-XXXX-XXXX
   Plan:    operator
   Expires: 2027-03-18T00:00:00+00:00
   Features: sentinel, infrawatch, watchdog, lazarus, agent911, ...
```

---

## Step 3: Run Your Product

Once the license is in place, your product will start normally:

```bash
# Example: Sentinel
python3 sentinel_attach_bridge.py

# Example: Lazarus
python3 lazarus.py --mode scan
```

If the license is missing or expired, you'll see:

```
[ACME LICENSE] ❌ No Acme license found. Purchase at acmeagentsupply.com
                   or set ACME_LICENSE_PATH. Expected: ~/.acme/license.json
```

---

## Troubleshooting

**"License file has been tampered with"**
The file was modified after delivery. Re-download from your original delivery email or contact support@acmeagentsupply.com.

**"License signature is invalid"**
The file may be corrupted or from a different account. Re-download from your delivery email.

**"Your license does not include 'sentinel'"**
Your current plan doesn't include this product. Upgrade at [acmeagentsupply.com](https://acmeagentsupply.com).

**"License expired"**
Renew your subscription at [acmeagentsupply.com](https://acmeagentsupply.com). Your license.json will be re-delivered automatically on renewal.

---

## Environment Variable Override

For CI/CD or multi-machine deployments, set the license path explicitly:

```bash
export ACME_LICENSE_PATH=/path/to/license.json
python3 lazarus.py --mode scan
```

---

## Need Help?

Contact us at [support@acmeagentsupply.com](mailto:support@acmeagentsupply.com) or visit [acmeagentsupply.com](https://acmeagentsupply.com).
