import { Link, useLoaderData, Form, useSearchParams } from "remix";
import type { LoaderFunction } from "remix";
import type { House } from "../../types";
import { handleEmptyInputs } from "../../utils/index";
import { Image } from "~/components/Image";

export const loader: LoaderFunction = async ({
  request,
}): Promise<{
  houses: House[];
}> => {
  const url = new URL(request.url);
  // const searchParams: Record<string, string> = {};
  // [...url.searchParams.keys()].forEach((key, index) => {
  //   searchParams[key] = [...url.searchParams.values()][index];
  // });
  const rooms = url.searchParams.get("rooms");
  const city = url.searchParams.get("city");

  const data = await fetch(
    `${process.env.BASE_API}/?per_page=3${rooms ? "&rooms=" + rooms : ""}${
      city ? "&city=" + city : ""
    }`
  );
  const res: { data: House[] } = await data.json();
  return {
    houses: res.data,
  };
};

export default function Houses() {
  const { houses } = useLoaderData<{ houses: House[] }>();

  const [searchParams] = useSearchParams();

  return (
    <div>
      <h1>Houses</h1>
      <Link to="/">Go to homepage</Link>

      <div>
        <Form method="get">
          <input
            type="number"
            name="rooms"
            placeholder="Rooms"
            defaultValue={searchParams.getAll("rooms")}
            max={6}
            min={2}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            defaultValue={searchParams.getAll("city")}
          />
          <input
            type="submit"
            value="Filter houses"
            onClick={(e) => {
              handleEmptyInputs(e, "remove");
            }}
            onMouseLeave={(e) => {
              handleEmptyInputs(e, "set");
            }}
          />
        </Form>
      </div>

      <ul>
        {houses.map((house, index) => (
          <li key={house.property_id}>
            <Link to={`${house.property_id}`}>
              <h2>{house.title}</h2>
              <div className="image">
                <Image
                  src={house.image}
                  width={300}
                  responsive={[
                    {
                      size: {
                        width: 300,
                        height: 200,
                      },
                    },
                  ]}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
