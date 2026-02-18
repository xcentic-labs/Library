"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface EditDateModalProps {
    isOpen: boolean;
    onClose: () => void;
    seatId: number;
    currentStartDate: string | Date;
    currentEndDate: string | Date;
    seatNumber: number;
    onSuccess: () => void;
}

export default function EditDateModal({
    isOpen,
    onClose,
    seatId,
    currentStartDate,
    currentEndDate,
    seatNumber,
    onSuccess
}: EditDateModalProps) {
    const [newEndDate, setNewEndDate] = useState<string>(
        new Date(currentEndDate).toISOString().split('T')[0]
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const formatDateForInput = (date: string | Date) => {
        return new Date(date).toISOString().split('T')[0];
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.patch('/api/seat/extend', {
                seatId,
                newEndDate
            });

            if (response.status === 200) {
                toast.success('Booking date extended successfully!');
                onSuccess();
                onClose();
            }
        } catch (error: any) {
            console.error('Error extending booking date:', error);
            toast.error(error.response?.data?.error || 'Failed to extend booking date');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Edit Booking Date - Seat #{seatNumber}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                        disabled={isLoading}
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Current Start Date
                            </label>
                            <input
                                type="date"
                                value={formatDateForInput(currentStartDate)}
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Current End Date
                            </label>
                            <input
                                type="date"
                                value={formatDateForInput(currentEndDate)}
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                New End Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={newEndDate}
                                onChange={(e) => setNewEndDate(e.target.value)}
                                min={formatDateForInput(currentStartDate)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Select a date after {new Date(currentStartDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Updating...' : 'Update Date'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
