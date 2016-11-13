export const conferences = ({ conference }, { page, itemsLimit }) => {
  const start = itemsLimit * (page - 1);
  const end = start + itemsLimit;

  return conference.items
    .slice(start, end)
    .filter(item => item !== null);
};

export const conferenceBySlug = ({ conference }, { slug }) =>
  conference.items.find(item => item.slug === slug);

export const totalPages = ({ conference }, { itemsLimit }) =>
  Math.ceil(conference.items.length / itemsLimit);
