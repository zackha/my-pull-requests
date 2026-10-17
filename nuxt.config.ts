// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // https://nuxt.com/modules
  modules: ['@nuxt/eslint', '@nuxt/ui', '@vueuse/nuxt', '@nuxthub/core'],

  hub: { cache: true },

  $production: {
    hub: {
      cache: {
        driver: 'cloudflare-kv-binding',
        namespaceId: '45992dda7dc344699fe41e87497203ec',
      },
    },
    nitro: {
      preset: 'cloudflare_module',
      cloudflare: {
        deployConfig: true,
        nodeCompat: true,
        wrangler: { name: 'prs' },
      },
    },
    // `isr` is Vercel/Netlify only and silently ignored on Cloudflare.
    // `swr` uses Nitro's cache storage, backed by Workers KV through NuxtHub.
    routeRules: {
      '/': { swr: 60 * 10 },
      '/feed.xml': { swr: 60 * 10 },
    },
  },

  // https://devtools.nuxt.com
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  compatibilityDate: '2026-10-01',

  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
})
