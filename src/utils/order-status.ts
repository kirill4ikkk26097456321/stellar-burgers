export const getOrderStatusText = (status: string): string => {
  switch (status) {
    case 'done':
      return 'Выполнен';
    case 'pending':
      return 'Готовится';
    case 'created':
      return 'Создан';
    default:
      return 'Отменён';
  }
};

export const getOrderStatusColor = (
  status: string
): 'success' | 'pending' | 'error' => {
  switch (status) {
    case 'done':
      return 'success';
    case 'pending':
      return 'pending';
    default:
      return 'error';
  }
};
