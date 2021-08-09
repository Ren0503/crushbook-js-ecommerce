import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

const Paginate = ({ category, pages, page }) => {
    return (
        pages > 1 && (
            <Pagination
                page={page}
                count={pages}
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        to={`/${category}/${item.page}`}
                        {...item}
                    />
                )}
            />
        )
    );
}

export default Paginate