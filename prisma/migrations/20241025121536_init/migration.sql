-- CreateTable
CREATE TABLE "Todolist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "isFinished" BOOLEAN NOT NULL,
    "userId" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Todolist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
