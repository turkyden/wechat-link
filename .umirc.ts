import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    'primary-color': '#6366F1',
    'border-radius-base': '4px',
  },
  antd: {
    dark: false, // 开启暗色主题
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
});
