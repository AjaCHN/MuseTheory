import { render, screen } from '@testing-library/react';
import Loading from '../app/loading';

describe('Loading Component', () => {
  it('renders the loading text', () => {
    render(<Loading />);
    expect(screen.getByText('Loading MuseTheory AI...')).toBeInTheDocument();
  });
});
