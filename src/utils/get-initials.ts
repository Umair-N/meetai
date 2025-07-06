export const getIntials = (name: string) => {
  const [firstName, lastName] = name.split(" ");
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  return initials;
};
