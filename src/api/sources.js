import axios from "axios";
import { createUrl } from "api/url";
import { SERVER_MAP } from "api/constants";

export const getRentalListings = async ({
  page = 1,
  limit = 40,
  locations = [],
  sources = [],
  minPrice,
  maxPrice,
}) => {
  const source = SERVER_MAP.TREASURE_FINDER;
  const route = "/rentalListings";
  const params = {
    page,
    limit,
    locations,
    sources,
    minPrice,
    maxPrice,
  };
  const url = createUrl(source, route, params);
  const response = await axios.get(url);
  return response.data;
};
