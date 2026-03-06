export interface CustomToastProps {
  text1?: string;
  text2?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

export const CustomToast: React.FC<CustomToastProps>;
