<script>
export default {
    name: 'FooterBar',
    computed: {
        year() {
            return new Date().getFullYear();
        }
    }
}
</script>

<template>
    <footer class="footer" aria-label="Site footer">
        <!-- Brand line -->
        <div class="row brand">
            <span class="muted">© {{ year }} BeyCloths</span>
            <span class="sep">·</span>
            <span class="muted">Rakamin X Core Initiative</span>
            <span class="sep">·</span>
            <span class="muted">Project Based Internship</span>
        </div>

        <!-- Social / profile links (text list) -->
        <nav class="row nav" aria-label="Profile links">
            <a href="https://github.com/bayufadayan" target="_blank" rel="noopener">GitHub</a>
            <span class="sep">•</span>
            <a href="https://www.linkedin.com/in/muhamad-bayu-fadayan/" target="_blank" rel="noopener">LinkedIn</a>
            <span class="sep">•</span>
            <a href="https://bayufadayan.my.id/" target="_blank" rel="noopener">Portfolio</a>
            <span class="sep">•</span>
            <a href="https://drive.google.com/file/d/1fPClIxWKbeaKyArwL9cSIDmOFeT-tBt2/view?usp=drive_link"
                target="_blank" rel="noopener">Curriculum Vitae</a>
        </nav>

        <!-- Made by + role/year + repo -->
        <div class="row meta">
            <span>Made with <span class="heart" aria-hidden="true">♥</span> by <a href="https://github.com/bayufadayan"
                    target="_blank" rel="noopener">Bayu Fadayan</a></span>
            <span class="sep">•</span>
            <span class="muted">Role: Frontend Engineer</span>
            <span class="sep">•</span>
            <span class="muted">Year: {{ year }}</span>
            <span class="sep">•</span>
            <a href="https://github.com/bayufadayan/ecommerce-catalog" target="_blank" rel="noopener">Repository</a>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    display: grid;
    gap: 10px;
    padding: 16px;
    border-top: 1px solid var(--color-border, #e6e6e6);
    background: var(--color-bg, #fff);
    color: var(--color-text-secondary, #6b7280);
    font: 13px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, Inter, Arial, sans-serif;
}

.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    text-align: center;
}

.brand {
    opacity: .9;
}

.meta {
    opacity: .95;
}

a {
    color: var(--color-text-primary, #374151);
    text-decoration: none;
    border-bottom: 1px dashed transparent;
    transition: border-color .15s ease, color .15s ease, opacity .15s ease;
}

a:hover {
    border-bottom-color: currentColor;
}

.muted {
    color: var(--color-text-secondary, #6b7280);
}

.sep {
    color: var(--color-text-tertiary, #9aa1a9);
    user-select: none;
}

.heart {
    color: var(--color-secondary, #ef4444);
}

/* Compact on small screens */
@media (max-width: 480px) {
    .footer {
        padding: 14px 12px;
    }

    .row {
        gap: 6px;
    }
}
</style>
