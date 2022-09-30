import { render, screen } from '@testing-library/react';
import Index from '../pages/index';

const testUser = {
  user: {
    name: 'Ayo Adesanya',
    email: 'ayo.daniel.adesanya@gmail.com',
    image:
      'https://lh3.googleusercontent.com/a-/ACNPEu_fy5sOQJI8IMZzGiP0W-QWpSrEI_CD4DOAmUoAXw=s96-c',
  },
  expires: '2025-10-30T06:50:25.076Z',
};

describe('Home', () => {
  it('renders the heading from index', () => {
    render(<Index session={testUser} />);

    const header = screen.getAllByTestId('header');

    console.log(header);

    expect(header).toBeInTheDocument();
  });
});
