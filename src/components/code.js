
import { PrismCode } from 'react-prism';

export default (props) => (
  <div>
    <pre>
      <PrismCode className="language-jsx">{children}</PrismCode>
    </pre>
  </div>
);
