import React from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="service">
      <div className={`icon service ${icon}`}></div>
      <div className="service-description">
        <span>{title}</span>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
