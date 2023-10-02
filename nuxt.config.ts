import { Plugin } from "vite"
import vuetify from "vite-plugin-vuetify"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default ({
    ssr: true,
    css: ["vuetify/styles"],
    sourcemap: { server: false, client: false },
    modules: [
        async (options: any, nuxt: { hooks: { hook: (arg0: string, arg1: (config: any) => any) => void } }) => {
            nuxt.hooks.hook("vite:extendConfig", (config: { plugins: Plugin[][] }) => 
                // @ts-ignore
                config.plugins.push(
                    // Here you can specify a custom styles file for vuetify
                    vuetify({
                        styles: { configFile: "assets/settings.scss" }
                    })
                )
            )
        },
        '@sidebase/nuxt-auth',
        '@sidebase/nuxt-session',
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt'
    ],
    auth: {
        provider: {
          type: 'authjs',
        },
        globalAppMiddleware: {
          isEnabled: true
        }
    },
    build:{ transpile: ["vuetify"] },
    vite: { ssr: { noExternal: ["vuetify"] } },
    // @ts-ignore
    // Here you can specify a custom font for the app
    googleFonts: {
        families: {
            Roboto: [100, 200, 300, 400 , 500, 600, 700, 800, 900],
        },
        download: false,
        useStylesheet: true
    }
})
