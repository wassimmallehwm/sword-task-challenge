// createMockUsers = async (role, size) => {
//     for (let index = 1; index < size; index++) {
//         let i = 0
//         if (index < 10) {
//             i = `0${index}`
//         } else {
//             i = index
//         }
//         const password = await PasswordEncoder.hash(`user${i}`)
//         const item = new User({
//             email: `user${i}@mail.com`,
//             firstname: `user${i}`,
//             lastname: `user${i}`,
//             role,
//             password
//         });
//         await item.save();

//     }
// }