// track the searches made by a user
import { Client, ID, Query, TablesDB } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const APPWRITE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(PROJECT_ID);

// export const updateSearchCount = async (query: string, movie: Movie) => {
//   // check if a record of that search has already been declared
//   // if a document is found increment the searchCount field
//   // if no document is found
//   // create a new document in appwrite database

//   const tablesDB = new TablesDB(client);

//   const promise = tablesDB.createRow({
//     databaseId: DATABASE_ID,
//     tableId: "metrics",
//     rowId: ID.unique(),
//     data: { title: "Hamlet" },
//   });

//   promise.then(
//     function (response) {
//       console.log(response);
//     },
//     function (error) {
//       console.log(error);
//     },
//   );
// };

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    if (!query || !movie) return;
    const tablesDB = new TablesDB(client);
    const result = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: "metrics",
      queries: [Query.equal("searchTerm", query)],
    });

    console.log("result ", result);

    if (result.rows.length > 0) {
      const existingMovie = result.rows[0];

      await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: "metrics",
        rowId: existingMovie.$id,
        data: {
          count: existingMovie.count + 1,
        },
      });
    } else {
      const res = await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: "metrics",
        rowId: ID.unique(),
        data: {
          searchTerm: query,
          movie_id: movie.id,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title,
        },
      });

      console.log("res ", res);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const tablesDB = new TablesDB(client);
    const result = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: "metrics",
      queries: [Query.limit(5), Query.orderDesc("count")],
    });

    return result.rows as unknown as TrendingMovie[];
  } catch (error) {
    console.error(error);
  }
};
