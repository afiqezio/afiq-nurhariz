import { Link } from "react-router-dom";

// Back to the project list — shown over the film and again in the case-study
// header. Index scrolls to the section named in `scrollTo` once it is ready.
const AllWorkLink = () => (
  <Link className="nav-link pp-nav-back" to="/" state={{ scrollTo: "projects" }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
    All work
  </Link>
);

export default AllWorkLink;
