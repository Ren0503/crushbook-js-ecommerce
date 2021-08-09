import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ category, pages, page, sort = '' }) => {
    return (
        pages > 1 && (
            <Pagination>
                <LinkContainer to={
                    sort
                        ? `/sort/${sort}/${category}/1`
                        : `/${category}/1`
                }>
                    <Pagination.First disabled={page === 1} />
                </LinkContainer>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={
                            sort
                                ? `/sort/${sort}/${category}/${x + 1}`
                                : `/${category}/${x + 1}`
                        }
                    >
                        <Pagination.Item active={x + 1 === page}>
                            {x + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
                <LinkContainer to={
                    sort
                        ? `/sort/${sort}/${category}/${pages}`
                        : `/${category}/${pages}`
                }>
                    <Pagination.Last disabled={page === pages} />
                </LinkContainer>
            </Pagination>
        )
    );
}

export default Paginate;
