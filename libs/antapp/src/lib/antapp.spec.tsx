import { render } from '@testing-library/react';

import Antapp from './antapp';

describe('Antapp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Antapp />);
    expect(baseElement).toBeTruthy();
  });
});
