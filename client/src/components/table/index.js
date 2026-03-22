import { useState } from 'react';
import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	getPaginationRowModel,
	flexRender,
} from '@tanstack/react-table';

const columns = [
	{ accessorKey: 'number', header: 'Claim ID', enableSorting: false },
	{ accessorKey: 'status', header: 'Status', enableSorting: false },
	{ accessorKey: 'amount', header: 'Amount' },
	{ accessorKey: 'holder', header: 'Holder', enableSorting: false },
	{ accessorKey: 'policyNumber', header: 'Policy number', enableSorting: false },
	{ accessorKey: 'insuredItem', header: 'Insured item', enableSorting: false },
	{
		accessorKey: 'description',
		header: 'Description',
		enableSorting: false,
		meta: { style: { maxWidth: '180px', whiteSpace: 'normal', wordBreak: 'break-word' } },
	},
	{ accessorKey: 'incidentDate', header: 'Incident date', enableSorting: false },
	{ accessorKey: 'processingFee', header: 'Processing fee' },
	{ accessorKey: 'totalFee', header: 'Total amount' },
	{ accessorKey: 'createdAt', header: 'Created at' },
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

	const table = useReactTable({
		data: filteredClaims ?? [],
		columns,
		state: { sorting, pagination },
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div>
			<table className="table table-striped table-hover table-sm">
				<caption className="visually-hidden">Claims overview</caption>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const canSort = header.column.getCanSort();
								const sorted = header.column.getIsSorted();
								return (
									<th
										key={header.id}
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
										style={{ cursor: canSort ? 'pointer' : 'default' }}
									>
										{flexRender(header.column.columnDef.header, header.getContext())}
										{sorted === 'asc' ? ' ↑' : sorted === 'desc' ? ' ↓' : ''}
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
			<nav aria-label="Table pagination">
				<div className="d-flex align-items-center gap-2">
					<button
						className="btn btn-outline-secondary btn-sm"
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
						className="btn btn-outline-secondary btn-sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						aria-label="Next page"
					>
						Next
					</button>
				</div>
			</nav>
		</div>
	);
};

export default ClaimsTable;
