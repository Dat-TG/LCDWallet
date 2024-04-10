// vite.config.ts
import * as path from "path";
import react from "file:///F:/dev/projects/react/LCDWallet/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///F:/dev/projects/react/LCDWallet/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///F:/dev/projects/react/LCDWallet/node_modules/vite-plugin-pwa/dist/index.js";

// manifest.json
var manifest_default = {
  name: "React PWA",
  short_name: "reactpwa",
  description: "Starter kit for modern web applications",
  theme_color: "#ffffff",
  icons: [
    {
      src: "pwa-192x192.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "pwa-512x512.png",
      sizes: "512x512",
      type: "image/png"
    },
    {
      src: "pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable"
    }
  ]
};

// vite.config.ts
var __vite_injected_original_dirname = "F:\\dev\\projects\\react\\LCDWallet";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: manifest_default,
      includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],
      // switch to "true" to enable sw on development
      devOptions: {
        enabled: false
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html}", "**/*.{svg,png,jpg,gif}"]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  test: {
    root: path.resolve(__vite_injected_original_dirname, "./src")
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXGRldlxcXFxwcm9qZWN0c1xcXFxyZWFjdFxcXFxMQ0RXYWxsZXRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXGRldlxcXFxwcm9qZWN0c1xcXFxyZWFjdFxcXFxMQ0RXYWxsZXRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L2Rldi9wcm9qZWN0cy9yZWFjdC9MQ0RXYWxsZXQvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XG5cbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL21hbmlmZXN0Lmpzb24nO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgVml0ZVBXQSh7XG4gICAgICBtYW5pZmVzdCxcbiAgICAgIGluY2x1ZGVBc3NldHM6IFsnZmF2aWNvbi5zdmcnLCAnZmF2aWNvbi5pY28nLCAncm9ib3RzLnR4dCcsICdhcHBsZS10b3VjaC1pY29uLnBuZyddLFxuICAgICAgLy8gc3dpdGNoIHRvIFwidHJ1ZVwiIHRvIGVuYWJsZSBzdyBvbiBkZXZlbG9wbWVudFxuICAgICAgZGV2T3B0aW9uczoge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB3b3JrYm94OiB7XG4gICAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntqcyxjc3MsaHRtbH0nLCAnKiovKi57c3ZnLHBuZyxqcGcsZ2lmfSddLFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgIH0sXG4gIH0sXG4gIHRlc3Q6IHtcbiAgICByb290OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgfSxcbn0pO1xuIiwgIntcbiAgXCJuYW1lXCI6IFwiUmVhY3QgUFdBXCIsXG4gIFwic2hvcnRfbmFtZVwiOiBcInJlYWN0cHdhXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJTdGFydGVyIGtpdCBmb3IgbW9kZXJuIHdlYiBhcHBsaWNhdGlvbnNcIixcbiAgXCJ0aGVtZV9jb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgXCJpY29uc1wiOiBbXG4gICAge1xuICAgICAgXCJzcmNcIjogXCJwd2EtMTkyeDE5Mi5wbmdcIixcbiAgICAgIFwic2l6ZXNcIjogXCIxOTJ4MTkyXCIsXG4gICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJzcmNcIjogXCJwd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgIFwic2l6ZXNcIjogXCI1MTJ4NTEyXCIsXG4gICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJzcmNcIjogXCJwd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgIFwic2l6ZXNcIjogXCI1MTJ4NTEyXCIsXG4gICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcbiAgICAgIFwicHVycG9zZVwiOiBcImFueSBtYXNrYWJsZVwiXG4gICAgfVxuICBdXG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGVBQWU7OztBQ0p4QjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsWUFBYztBQUFBLEVBQ2QsYUFBZTtBQUFBLEVBQ2YsYUFBZTtBQUFBLEVBQ2YsT0FBUztBQUFBLElBQ1A7QUFBQSxNQUNFLEtBQU87QUFBQSxNQUNQLE9BQVM7QUFBQSxNQUNULE1BQVE7QUFBQSxJQUNWO0FBQUEsSUFDQTtBQUFBLE1BQ0UsS0FBTztBQUFBLE1BQ1AsT0FBUztBQUFBLE1BQ1QsTUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxLQUFPO0FBQUEsTUFDUCxPQUFTO0FBQUEsTUFDVCxNQUFRO0FBQUEsTUFDUixTQUFXO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFDRjs7O0FEdkJBLElBQU0sbUNBQW1DO0FBU3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOO0FBQUEsTUFDQSxlQUFlLENBQUMsZUFBZSxlQUFlLGNBQWMsc0JBQXNCO0FBQUE7QUFBQSxNQUVsRixZQUFZO0FBQUEsUUFDVixTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1AsY0FBYyxDQUFDLHNCQUFzQix3QkFBd0I7QUFBQSxNQUMvRDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQVUsYUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixNQUFXLGFBQVEsa0NBQVcsT0FBTztBQUFBLEVBQ3ZDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
