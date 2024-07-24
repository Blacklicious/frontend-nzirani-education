'use client';

import InfosPage from './infos/page';
import RelativesPage from './relatives/page';
import EducationDetailsPage from './history/page';
import ExtraDetailsPage from './extra/page';
import MedicalRecordPage from './health/page';

const StudentRegistration = () => {

  return (
    <div className="container mx-auto px-4 py-8 bg-black/10 w-[100vw] h-[100%]">
        <InfosPage />
        <RelativesPage  />
        <EducationDetailsPage />
        <MedicalRecordPage />
        <ExtraDetailsPage />
    </div>
  );
};

export default StudentRegistration;