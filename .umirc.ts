import { defineConfig } from 'umi';

export default defineConfig({
  ssr: {},
  exportStatic: {},
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    'primary-color': '#EC4899',
  },
  antd: {
    dark: false, // 开启暗色主题
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
});
