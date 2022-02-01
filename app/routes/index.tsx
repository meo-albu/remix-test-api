import { Link } from "remix";
export default function Index() {
  return (
    <div>
      <h1>Homepage</h1>
      <Link to="/houses">Go to houses</Link>
    </div>
  );
}
