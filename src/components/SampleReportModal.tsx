'use client';

import { useState } from 'react';

interface SampleReportModalProps {
  children: React.ReactNode;
  className?: string;
}

function SampleReportModalTrigger({ children, className }: SampleReportModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {children}
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Sample Pricing Report</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <img
                  src="https://images.unsplash.com/photo-1603569283847-2778687b2c2f?q=80&w=400&auto=format&fit=crop"
                  alt="Sample jewelry"
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-lg">Handmade Silver Ring</h3>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-green-600">$48 - $59</div>
                  <div className="text-sm text-gray-600">Suggested retail price</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-3">
                  <div className="font-medium">Materials</div>
                  <div className="text-sm text-gray-600">$9.10</div>
                  <div className="text-xs text-gray-500">Silver wire, beads</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium">Labor</div>
                  <div className="text-sm text-gray-600">1.5 hours</div>
                  <div className="text-xs text-gray-500">Design + crafting</div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Pricing Breakdown</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Materials cost:</span>
                    <span>$9.10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Labor (1.5h × $20/hr):</span>
                    <span>$30.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overhead (15%):</span>
                    <span>$5.87</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-1">
                    <span>Suggested price range:</span>
                    <span>$48 - $59</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-[#0E0E0F] text-white rounded-md hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const SampleReportModal = {
  Trigger: SampleReportModalTrigger,
};

export default SampleReportModal;
