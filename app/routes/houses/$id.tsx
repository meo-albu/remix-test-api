import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import type { SingleHouse } from "../../types";

export const loader: LoaderFunction = async ({ params }) => {
  const data = await fetch(`${process.env.BASE_API}/${params.id}`);
  const res = await data.json();
  return {
    data: res.data,
  };
};

export default function House() {
  const { data } = useLoaderData<{ data: SingleHouse }>();

  return (
    <div>
      <h1>Single house</h1>
      <button onClick={() => history.back()}>
        <a>👈 Go Back</a>
      </button>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
        }}
      >
        {data.images.map((image) => {
          return (
            <div
              style={{ width: "250px", height: "150px", flexShrink: "0" }}
              key={image}
            >
              <img
                src={image}
                width="250"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
