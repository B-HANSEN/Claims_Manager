import { useState, useEffect, useRef } from 'react';
import './table.css';
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	getPaginationRowModel,
	flexRender,
} from '@tanstack/react-table';

const shrink = { whiteSpace: 'nowrap' };

const columns = [
	{
		id: 'rowNumber',
		header: '#',
		enableSorting: false,
		cell: ({ row, table }) => {
			const { pageIndex, pageSize } = table.getState().pagination;
			const positionInPage = table.getRowModel().rows.indexOf(row);
			return pageIndex * pageSize + positionInPage + 1;
		},
		meta: { style: shrink },
	},
	{ accessorKey: 'number', header: 'Claim ID', enableSorting: false, meta: { style: shrink } },
	{ accessorKey: 'status', header: 'Status', enableSorting: false, meta: { style: shrink } },
	{ accessorKey: 'amount', header: 'Amount', meta: { style: shrink } },
	{ accessorKey: 'holder', header: 'Holder', enableSorting: false, meta: { style: shrink } },
	{
		accessorKey: 'policyNumber',
		header: 'Policy number',
		enableSorting: false,
		meta: { style: shrink },
	},
	{
		accessorKey: 'insuredItem',
		header: 'Insured item',
		enableSorting: false,
		meta: { style: shrink },
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableSorting: false,
		meta: {
			style: {
				whiteSpace: 'normal',
				wordBreak: 'break-word',
				display: '-webkit-box',
				WebkitLineClamp: 3,
				WebkitBoxOrient: 'vertical',
				overflow: 'hidden',
			},
		},
	},
	{
		accessorKey: 'incidentDate',
		header: 'Incident date',
		enableSorting: false,
		meta: { style: shrink },
	},
	{ accessorKey: 'processingFee', header: 'Processing fee', meta: { style: shrink } },
	{ accessorKey: 'totalFee', header: 'Total amount', meta: { style: shrink } },
	{ accessorKey: 'createdAt', header: 'Created at', meta: { style: shrink } },
];

const getAriaSort = (column) => {
	const sorted = column.getIsSorted();
	if (!column.getCanSort()) return undefined;
	if (sorted === 'asc') return 'ascending';
	if (sorted === 'desc') return 'descending';
	return 'none';
};

const ClaimsTable = ({ filteredClaims }) => {
	'use no memo';
	const [sorting, setSorting] = useState([]);
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
	const [columnVisibility, setColumnVisibility] = useState({});

	const containerRef = useRef(null);
	const descThRef = useRef(null);
	const hideInfoRef = useRef(null); // { showThreshold } when description is hidden

	const checkDescriptionVisibility = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const check = () => {
			const containerWidth = container.offsetWidth;
			if (!hideInfoRef.current) {
				const descTh = descThRef.current;
				if (descTh && descTh.offsetWidth < 125) {
					hideInfoRef.current = {
						showThreshold: containerWidth + (125 - descTh.offsetWidth) + 1,
					};
					setColumnVisibility({ description: false });
				}
			} else {
				if (containerWidth >= hideInfoRef.current.showThreshold) {
					hideInfoRef.current = null;
					setColumnVisibility({});
				}
			}
		};

		checkDescriptionVisibility.current = check;

		const observer = new ResizeObserver(check);
		observer.observe(container);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		checkDescriptionVisibility.current?.();
	}, [filteredClaims]);

	const table = useReactTable({
		data: filteredClaims ?? [],
		columns,
		state: { sorting, pagination, columnVisibility },
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div ref={containerRef}>
			<nav aria-label="Table pagination" style={{ margin: '16px 0' }}>
				<div
					className="d-flex align-items-center justify-content-center gap-2"
					style={{ marginBottom: '32px' }}
				>
					<button
						className="btn btn-outline-secondary btn-sm pagination-btn"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						aria-label="Previous page"
					>
						Previous
					</button>
					<span aria-live="polite">
						Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
					</span>
					<button
						className="btn btn-outline-secondary btn-sm pagination-btn"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						aria-label="Next page"
					>
						Next
					</button>
				</div>
			</nav>
			<table
				className="table table-striped table-hover table-sm table-bordered border-dark"
				style={{ width: '100%' }}
			>
				<caption className="visually-hidden">Claims overview</caption>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const canSort = header.column.getCanSort();
								const sorted = header.column.getIsSorted();
								const isDescription = header.column.id === 'description';
								return (
									<th
										key={header.id}
										ref={isDescription ? descThRef : undefined}
										scope="col"
										aria-sort={getAriaSort(header.column)}
										tabIndex={canSort ? 0 : undefined}
										onClick={header.column.getToggleSortingHandler()}
										onKeyDown={(e) => {
											if (canSort && (e.key === 'Enter' || e.key === ' ')) {
												e.preventDefault();
												header.column.getToggleSortingHandler()(e);
											}
										}}
										style={{
											cursor: canSort ? 'pointer' : 'default',
											...header.column.columnDef.meta?.style,
										}}
									>
										{flexRender(header.column.columnDef.header, header.getContext())}
										{canSort && (
											<span
												style={{
													marginLeft: '4px',
													fontWeight: sorted ? 'bold' : 'normal',
													opacity: sorted ? 1 : 0.35,
												}}
											>
												{sorted === 'desc' ? '↓' : '↑'}
											</span>
										)}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} style={cell.column.columnDef.meta?.style}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ClaimsTable;
