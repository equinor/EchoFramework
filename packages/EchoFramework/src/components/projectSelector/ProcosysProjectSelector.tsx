import { Dropdown } from '@equinor/echo-components';
import {
    ProcosysProject,
    setSelectedProcosysProject,
    useProcosysProjectCode,
    useProcosysProjectsData
} from '@equinor/echo-core';
import { StarProgress } from '@equinor/eds-core-react';
import React from 'react';
import { filterProjectsStartsWithFirst } from '../../utils/projectSelectorUtils';
import styles from './ProcosysProjectSelector.module.css';

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
    const { procosysProjectsHasError, procosysProjects } = useProcosysProjectsData();
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

    const loadingOrError = procosysProjectsHasError ? (
        <div>Could not load projects.</div>
    ) : (
        <div>
            Loading projects
            <StarProgress size={24} className={styles.spinner} />
        </div>
    );

    return (
        <>
            {procosysProjects.length === 0 ? (
                loadingOrError
            ) : (
                <Dropdown
                    showSearch={true}
                    selected={selectedProcosysProjectCode}
                    data={dropdownProcosysProjects}
                    filterFunc={filterProjectsStartsWithFirst}
                    openDownWards={true}
                    placeholder="Select ProCoSys project"
                    setSelected={handleProcosysProjectSelected}
                    isDisabled={isDisabled || !navigator.onLine}
                    disabledText="Disabled"
                    maxCharacterCount={maxCharacterCount}
                    variant={variant ? variant : 'default'}
                />
            )}
        </>
    );
};
