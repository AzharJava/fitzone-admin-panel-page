# FITZONE Admin Panel Demo

A responsive, frontend-only gym administration demo based on the supplied FITZONE reference screens.

## Included

- Admin login and logout flow
- Dashboard with KPIs, charts, tables and quick actions
- Member directory and live search
- Attendance overview and manual check-in form
- Payments overview and collect-payment form
- Website content manager
- Enquiries list and add-enquiry form
- Reports and analytics hub
- Notifications and send-notification form
- Responsive sidebar and mobile layout

All data and actions are simulated in the browser. This static demo does not contain a backend, real authentication, payment processing, messaging, or member data storage.

## Run locally

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Demo login

The login fields are pre-filled. Click **Login** to enter the dashboard.

## GitHub Pages

The included GitHub Actions workflow publishes the site to GitHub Pages after each push to `main`.
