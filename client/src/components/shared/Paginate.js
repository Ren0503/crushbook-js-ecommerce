import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ category, pages, page, query = '' }) => {
    return (
        pages > 1 && (
            <Pagination>
                <LinkContainer to={
                    query
                        ? `/${category}/1?${query}`
                        : `/${category}/1`
                }>
                    <Pagination.First disabled={page === 1} />
                </LinkContainer>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={
                            query
                                ? `/${category}/${x + 1}?${query}`
                                : `/${category}/${x + 1}`
                        }
                    >
                        <Pagination.Item active={x + 1 === page}>
                            {x + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
                <LinkContainer to={
                    query
                        ? `/${category}/${pages}?${query}`
                        : `/${category}/${pages}`
                }>
                    <Pagination.Last disabled={page === pages} />
                </LinkContainer>
            </Pagination>
        )
    );
}

export default Paginate;
