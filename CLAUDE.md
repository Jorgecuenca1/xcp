# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a **static mirror/archive** of the WordPress WooCommerce website www.xcp.com.co, downloaded using HTTrack Website Copier on October 30, 2025. This is NOT a development repository with source code - it's an offline snapshot of a live e-commerce site for archival or reference purposes.

**Website**: XCP (www.xcp.com.co) - Colombian industrial equipment and tools e-commerce store

## Structure

```
xcp/
├── index.html                    # HTTrack index page
├── hts-log.txt                   # HTTrack download log (508KB+)
├── hts-cache/                    # HTTrack cache directory
├── cookies.txt                   # Session cookies from download
└── www.xcp.com.co/              # Mirrored website content
    ├── wp-content/
    │   ├── themes/
    │   │   └── electro/         # Electro eCommerce theme (primary theme)
    │   ├── plugins/
    │   │   ├── woocommerce/     # WooCommerce e-commerce platform
    │   │   ├── elementor/       # Elementor page builder
    │   │   ├── elementor-pro/
    │   │   ├── revslider/       # Revolution Slider
    │   │   ├── yith-woocommerce-wishlist/
    │   │   ├── yith-woocommerce-compare/
    │   │   ├── advanced-dynamic-pricing-for-woocommerce/
    │   │   ├── wpforms-lite/
    │   │   └── [other plugins]
    │   └── uploads/             # Media files, product images
    ├── wp-includes/             # WordPress core files (static)
    ├── wp-admin/                # WordPress admin (non-functional)
    ├── wp-json/                 # WordPress REST API responses (JSON snapshots)
    ├── product/                 # Product pages
    └── categoria-de-producto/   # Product category pages (Spanish)
```

## Technology Stack

- **CMS**: WordPress (static snapshot)
- **E-commerce**: WooCommerce
- **Theme**: Electro - Electronics eCommerce theme
- **Page Builder**: Elementor + Elementor Pro
- **Key Plugins**:
  - Revolution Slider (revslider) - Homepage sliders
  - YITH WooCommerce Wishlist & Compare
  - Advanced Dynamic Pricing for WooCommerce
  - WPForms Lite - Contact forms
  - WP Rocket - Performance optimization
  - Product Video Gallery Slider
  - Google Analytics Integration
  - Cookie Notice
  - Jetpack

## Important Limitations

1. **No Development Workflow**: This is a static mirror, not source code
   - Cannot run `npm install`, `composer install`, or any build commands
   - No package.json, composer.json, or dependency management
   - No version control (.git not present)

2. **Non-Functional**:
   - PHP files are static HTML copies, not executable
   - WordPress admin (`wp-admin/`) is non-functional
   - No database connection (all content is baked into HTML)
   - Forms and interactive features are inert

3. **Content is Static**:
   - Product catalog is frozen at download time (Oct 30, 2025)
   - All links point to local files or broken external references
   - HTTrack has converted dynamic URLs to static `.html` files

## Potential Use Cases

If you need to work with this repository, typical scenarios include:

1. **Content Analysis**: Extract product information, pricing, or catalog data
2. **Design Reference**: Review theme structure, CSS, or layout patterns
3. **Asset Extraction**: Pull images, logos, or media files
4. **Migration Planning**: Understand site structure before rebuilding
5. **Offline Reference**: Browse product catalog offline

## Notes

- The mirror was created with HTTrack filters: `+*.png +*.gif +*.jpg +*.jpeg +*.css +*.js`
- Many dynamic pages failed during download (see `hts-log.txt` for 404/405/500 errors)
- Some product pages had compression errors during download
- External CDN resources are partially mirrored (cloudflare, wp.com stats)
- No sensitive credentials should be present, but check `cookies.txt` and `hts-cache/` if sharing

## Working with Content

To extract or analyze content from this mirror:

```bash
# Search for specific products
grep -r "product-name" www.xcp.com.co/product/

# Find all product images
find www.xcp.com.co/wp-content/uploads/ -name "*.jpg" -o -name "*.png"

# Extract product JSON data (from WP REST API snapshots)
find www.xcp.com.co/wp-json/wp/v2/product/ -name "*.json"

# View download errors/warnings
head -100 hts-log.txt
```

Since this is not a development repository, there are no build, test, or deployment commands available.
