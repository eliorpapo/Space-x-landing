import { Link } from 'react-router-dom';

export function LandingPreview({ landing }) {
  return (
    <article className='landing-preview'>
      <Link to={`/landing/${landing.id}`} className='info'>
        <h2>{landing.name}</h2>
        <img className='landing-img' src={landing.links.patch.small} />
      </Link>
    </article>
  );
}
