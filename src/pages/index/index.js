import {} from 'antd';
import Link from 'umi/link';

export default () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to='/text'>Text</Link>
                </li>
                <li>
                    <Link to='/image'>Image</Link>
                </li>
                <li>
                    <Link to='/audio'>Audio</Link>
                </li>
            </ul>
        </div>
    )
}
