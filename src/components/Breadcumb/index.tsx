import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

interface Item {
  name: string;
  to: string;
}

const Breadcumb = (items: Item[]) => {
  const location = useLocation();
  return (
    <>
      <Breadcrumb>
        {items.map((item, index) => (
          <BreadcrumbItem key={index} isCurrentPage={location.pathname === item.to}>
            <BreadcrumbLink as={Link} to={item.to}>
              {item.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </>
  );
};

export default Breadcumb;
