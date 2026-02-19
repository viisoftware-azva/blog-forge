/**
 * Dev Space Component Loader
 * Handles modular components for static HTML pages
 */

document.addEventListener('DOMContentLoaded', () => {
    // Basic site config if not loaded via script tag
    if (typeof SITE_CONFIG === 'undefined') {
        window.SITE_CONFIG = {
            name: 'Dev Space',
            logo: 'logo.svg',
            author: 'Tinh Nguyen',
            year: new Date().getFullYear()
        };
    }

    updatePageMeta();
    const prefix = getPathPrefix();
    loadNavbar(prefix);
    loadFooter(prefix);
});

function getPathPrefix() {
    let prefix = './';
    const currentHref = window.location.href.replace(/\\/g, '/');

    if (currentHref.includes('/blog/')) {
        const parts = currentHref.split('/blog/');
        const afterBlog = parts[1];
        if (afterBlog && afterBlog.includes('/') && afterBlog.split('/')[0] !== '') {
            prefix = '../../';
        } else {
            prefix = '../';
        }
    }
    return prefix;
}

function updatePageMeta() {
    // Basic branding update
    if (document.title.includes('Dev Space')) {
        document.title = document.title.replace('Dev Space', SITE_CONFIG.name);
    } else if (!document.title.includes(SITE_CONFIG.name)) {
        document.title = `${document.title} - ${SITE_CONFIG.name}`;
    }

    // Dynamic Meta Tags for SEO
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
    }
    if (!metaDescription.content) {
        metaDescription.content = SITE_CONFIG.description;
    }

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
    }
    if (!metaKeywords.content || metaKeywords.content === 'yeo') {
        metaKeywords.content = SITE_CONFIG.keywords;
    }

    // Open Graph Tags
    const ogTags = {
        'og:site_name': SITE_CONFIG.name,
        'og:title': document.title,
        'og:description': metaDescription.content,
        'og:url': window.location.href,
        'og:type': 'website'
    };

    for (const [property, content] of Object.entries(ogTags)) {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', property);
            document.head.appendChild(tag);
        }
        if (!tag.content) {
            tag.content = content;
        }
    }
}

function loadNavbar(prefix) {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (!navbarPlaceholder) return;

    const navbarHtml = `
        <div class="container yeo-header">
            <div class="columns">
                <div class="column col-12">
                    <header class="navbar">
                        <section class="navbar-section">
                            <a class="navbar-brand logo" href="${prefix}index.html">
                                <img class="logo-img" src="${prefix}images/${SITE_CONFIG.logo}" alt=""><span>${SITE_CONFIG.name}</span>
                            </a>
                        </section>
                        <section class="navbar-section section-menu">
                            <input type="checkbox" id="nav-toggle" class="nav-toggle-input">
                            <label for="nav-toggle" class="nav-toggle-label">
                                <span></span>
                            </label>
                            <nav class="nav-links">
                                <a class="btn btn-link" href="${prefix}index.html#we-do">What we do</a>
                                <a class="btn btn-link" href="${prefix}index.html#we-work">How we work</a>
                                <a class="btn btn-link" href="${prefix}blog/index.html" style="${window.location.href.includes('/blog/') ? 'font-weight: 700; opacity: 1;' : ''}">Blog</a>
                                <a class="btn btn-link" href="${prefix}index.html#price">Pricing</a>
                                <a class="btn btn-link" href="${prefix}index.html#team">Our Team</a>
                                <a class="btn btn-primary btn-hire-me" href="#" >Download</a>
                            </nav>
                        </section>
                    </header>
                </div>
            </div>
        </div>
    `;

    navbarPlaceholder.innerHTML = navbarHtml;

    // Add sticky class on scroll if needed
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbarPlaceholder.classList.add('navbar-sticky');
        } else {
            navbarPlaceholder.classList.remove('navbar-sticky');
        }
    });
}

function loadFooter(prefix) {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    const footerHtml = `
        <div class="yeo-footer">
            <div class="container">
                <div class="columns">
                    <div class="column col-4 col-sm-12">
                        <div class="yeo-footer-brand">
                            <div class="footer-logo">
                                <img src="${prefix}images/${SITE_CONFIG.logo}" alt="${SITE_CONFIG.name} logo" height="30">
                                <span class="footer-brand-name">${SITE_CONFIG.name}</span>
                            </div>
                            <p class="footer-desc">${SITE_CONFIG.description}</p>
                        </div>
                    </div>
                    <div class="column col-2 col-sm-6">
                        <div class="yeo-footer-content">
                            <h4>Explore</h4>
                            <ul class="nav">
                                <li class="nav-item"><a href="${prefix}index.html">Home</a></li>
                                <li class="nav-item"><a href="${prefix}blog/index.html">Blogs</a></li>
                                <li class="nav-item"><a href="${prefix}index.html#team">About</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="column col-3 col-sm-6">
                        <div class="yeo-footer-content">
                            <h4>Community</h4>
                            <ul class="nav">
                                <li class="nav-item"><a href="${SITE_CONFIG.socials.github}" target="_blank">Github</a></li>
                                <li class="nav-item"><a href="${SITE_CONFIG.socials.twitter}" target="_blank">Twitter</a></li>
                                <li class="nav-item"><a href="${SITE_CONFIG.socials.linkedin}" target="_blank">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="column col-3 col-sm-12">
                        <div class="yeo-footer-content">
                            <h4>Get in touch</h4>
                            <p class="footer-desc">Have questions? Reach out to us anytime.</p>
                            <a href="mailto:${SITE_CONFIG.socials.email}" class="btn btn-primary btn-sm" style="background:#00bc9e; border:none; border-radius:50px; padding: 5px 20px;">Contact Us</a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${SITE_CONFIG.year} ${SITE_CONFIG.name}. Built with love by ${SITE_CONFIG.author}.</p>
                </div>
            </div>
        </div>
    `;

    footerPlaceholder.innerHTML = footerHtml;
}
