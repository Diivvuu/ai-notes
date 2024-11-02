// src/types.ts

import { Id } from "@/convex/_generated/dataModel";

// User type representing an entry in the users table
export interface User {
  _id: Id<"users">; // Unique identifier
  name: string;
  email: string;
  image?: string; // Optional field
  plan: "free" | "paid"; // Plan type
}

// Team type representing an entry in the teams table
export interface Team {
  _id: Id<"teams">;
  name: string;
  ownerId: Id<"users">; // The main admin of the team
  joinCode: string; // Code to invite/join the team
  currentMemberCount: number; // Track current member count
  currentFileCount: number; // Track current file count
  maxMembers: number; // Limit for members based on plan
  maxFiles: number; // Limit for files based on plan
}

// Member type representing an entry in the members table
export interface Member {
  userId: Id<"users">; // User's ID
  teamId: Id<"teams">; // Team's ID
  role: "admin" | "member"; // User's role in the team
  joinedAt: number; // Timestamp for when they joined
}

// File type representing an entry in the files table
export interface File {
  id: Id<"files">; // Unique identifier for the file
  teamId: Id<"teams">; // The team the file belongs to
  userId: Id<"users">; // The user who uploaded the file
  fileName: string; // File name
  fileSize: number; // File size in bytes
  fileType: string; // MIME type (e.g., "image/png")
  storagePath: string; // Path or URL for file storage
  uploadedAt: number; // Timestamp for when the file was uploaded
}
