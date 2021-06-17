import { Dropdown } from '@equinor/echo-components';
import {
    ProcosysProject,
    setSelectedProcosysProject,
    useProcosysProjectCode,
    useProcosysProjects
} from '@equinor/echo-core';
import React from 'react';

interface ProjectSelectorProps {
    variant?: 'compact' | 'default';
    maxCharacterCount?: number;
    isDisabled?: boolean;
}

export const ALL_PROJECTS = 'All projects';

/**
 * Dropdown component for displaying a searchable project selector.
 * @param {ProjectSelectorProps} {
 * variant: The style type for the dropdown component. Either default or compact.
 * isDisabled: Flag which decides whether the dropdown should be disabled or not.
 * }
 * @return {*}
 */
export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
    variant,
    maxCharacterCount,
    isDisabled
}: ProjectSelectorProps) => {
    const selectedProcosysProjectCode = useProcosysProjectCode();
    const procosysProjects = useProcosysProjects();
    const dropdownProcosysProjects = procosysProjects.map((project) => project.projectCode);
    dropdownProcosysProjects.unshift(ALL_PROJECTS);

    const handleProcosysProjectSelected = async (projectCode: string): Promise<void> => {
        const newSelectedProcosysProject =
            projectCode === ALL_PROJECTS
                ? ({ projectCode: ALL_PROJECTS } as ProcosysProject)
                : procosysProjects.find((project: ProcosysProject) => project.projectCode === projectCode);
        if (newSelectedProcosysProject) {
            setSelectedProcosysProject(newSelectedProcosysProject);
        }
    };

    const filterProjects = (data: string[], filter: string): string[] => {
        return data.filter((item) => item.toLowerCase().indexOf(filter.trim().toLowerCase()) > -1);
    };

    return (
        <Dropdown
            showSearch={true}
            selected={selectedProcosysProjectCode}
            data={dropdownProcosysProjects}
            filterFunc={filterProjects}
            openDownWards={true}
            placeholder="Select ProCoSys project"
            setSelected={handleProcosysProjectSelected}
            isDisabled={isDisabled || !navigator.onLine}
            disabledText="Disabled"
            maxCharacterCount={maxCharacterCount}
            variant={variant ? variant : 'default'}
        />
    );
};
