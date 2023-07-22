import _Types from "@clerk/types";

declare global {
  interface UserPublicMetadata {
    /**
     * This is the Clerk user id inside
     * the project's MySQL database.
     */
    databaseId: number;
  }
}
