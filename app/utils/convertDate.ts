const convertDate = (date: string) => {
  return new Date(date).toLocaleString("id-ID");
};

export default convertDate;
