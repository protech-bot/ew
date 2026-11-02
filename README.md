# PROTECH GROUP Splash Screen

A lightweight, customizable JavaScript splash screen for websites.

Designed to display the PROTECH GROUP branding alongside partner logos, names, and animated transitions.

## Features

- Customizable splash screen styles.
- Support for multiple partner logos.
- Custom partner names and subtitles.
- Sequential logo presentation with slide animation.
- Smooth fade-out and opening transitions.
- Responsive DOM initialization.
- Automatic cleanup after the splash screen finishes.
- Image URL validation and loading error handling.
- No external JavaScript dependencies.

## Installation

Add the JavaScript file to your project:

```html
<script src="protech-splash.js"></script>
```

## Usage

You can configure the splash screen using HTML data attributes:

```html
<script
    src="protech-splash.js"
    data-ew="samsung"
    data-sublogos="https://example.com/logo1.png,https://example.com/logo2.png"
    data-subnames="Partner One,Partner Two"
    data-subname="Technology & Innovation"
></script>
```

## Configuration

| Attribute | Description |
|---|---|
| `data-ew` | Selects the splash screen style |
| `data-tv` | Alternative style attribute |
| `data-sublogos` | Comma-separated partner logo URLs |
| `data-subnames` | Comma-separated partner names |
| `data-subname` | Main branding subtitle |

## Customization

The main branding is configured inside the JavaScript source:

```javascript
const FIXED_MAIN_LOGO = "YOUR_LOGO_URL";
const FIXED_MAIN_NAME = "YOUR BRAND NAME";
```

## Browser Compatibility

Designed for modern browsers that support standard JavaScript and DOM APIs.

## License

See the repository's LICENSE file for licensing information.

---

**PROTECH GROUP**

Technology • Innovation • Development
