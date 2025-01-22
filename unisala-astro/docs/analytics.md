# import sendGAEvent from utils

    import { sendGAEvent } from '@/utils/analytics/events';

   sendGAEvent('thread_action', {
      category: 'threads',
      label: 'delete_comment_button',
      commentId,
    });