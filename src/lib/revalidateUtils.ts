export async function revalidateBooks() {
  fetch(`/api/revalidation/books?secret=${process.env.NEXTAUTH_SECRET}`)
    .then(() => {
      return;
    })
    .catch((err) => {
      throw err;
    });
}

async function revalidateUsers() {
  fetch(`/api/revalidation/users?secret=${process.env.NEXTAUTH_SECRET}`)
    .then(() => {
      return;
    })
    .catch((err) => {
      throw err;
    });
}
