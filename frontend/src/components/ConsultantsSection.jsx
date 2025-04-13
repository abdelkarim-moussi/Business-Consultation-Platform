import React from 'react';
import ProfileCard from './ProfileCard';

const ConsultantsSection = ({ data, loading, currentPage, consultantsPerPage }) => {
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Calculate the index range for the current page
  const indexOfLastConsultant = currentPage * consultantsPerPage;
  const indexOfFirstConsultant = indexOfLastConsultant - consultantsPerPage;
  const currentConsultants = data.slice(indexOfFirstConsultant, indexOfLastConsultant);

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center gap-5 px-5 md:px-10 py-10">
        {currentConsultants.map((consultant) => (
          <ProfileCard name={consultant.firstName} key={consultant.id} />
        ))}
      </div>
    </section>
  );
};

export default ConsultantsSection;
