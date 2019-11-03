/**
 * Created by PhpStorm.
 * User: Balogun Wahab
 * Date: 10/1/19
 * Time: 8:47 PM
 */
import dayjs from'dayjs';
import relativeTime from'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default dayjs;
