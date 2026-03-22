import React, { useState } from 'react';
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
	{ accessorKey: 'description', header: 'Description', enableSorting: false },
	{ accessorKey: 'incidentDate', header: 'Incident date', enableSorting: false },
	{ accessorKey: 'processingFee', header: 'Processing fee' },
	{ accessorKey: 'totalFee', header: 'Total amount' },
	{ accessorKey: 'createdAt', header: 'Created at' },
];

const ClaimsTable = ({ filteredClaims }) => {
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
			<table className='table table-striped table-hover table-sm'>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th
									key={header.id}
									onClick={header.column.getToggleSortingHandler()}
									style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
								>
									{flexRender(header.column.columnDef.header, header.getContext())}
									{header.column.getIsSorted() === 'asc' ? ' ↑' : header.column.getIsSorted() === 'desc' ? ' ↓' : ''}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div className='d-flex align-items-center gap-2'>
				<button
					className='btn btn-outline-secondary btn-sm'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</button>
				<span>
					Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</span>
				<button
					className='btn btn-outline-secondary btn-sm'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default ClaimsTable;
