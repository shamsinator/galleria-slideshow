import React from "react";
import { UserIcon } from "@components/Icons";

export const EmptyState = () => (
  <div className="text-center py-12">
    <div className="text-gray-400 mb-4">
      <UserIcon className="h-12 w-12 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No artwork found
      </h3>
      <p className="text-sm">
        Get started by adding your first artwork to the gallery.
      </p>
    </div>
  </div>
);
