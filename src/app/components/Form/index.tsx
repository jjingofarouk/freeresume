import React from "react";
import { motion } from "framer-motion";
import { ExpanderWithHeightTransition } from "components/ExpanderWithHeightTransition";
import {
  DeleteIconButton,
  MoveIconButton,
  ShowIconButton,
} from "components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import {
  changeFormHeading,
  changeFormOrder,
  changeShowForm,
  selectHeadingByForm,
  selectIsFirstForm,
  selectIsLastForm,
  selectShowByForm,
  ShowForm,
} from "lib/redux/settingsSlice";
import {
  BuildingOfficeIcon,
  AcademicCapIcon,
  LightBulbIcon,
  WrenchIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import {
  addSectionInForm,
  deleteSectionInFormByIdx,
  moveSectionInForm,
} from "lib/redux/resumeSlice";

export const BaseForm = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.section
    className={`flex flex-col gap-4 rounded-xl bg-[var(--theme-dark-blue)] p-6 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.section>
);

const FORM_TO_ICON: { [section in ShowForm]: typeof BuildingOfficeIcon } = {
  workExperiences: BuildingOfficeIcon,
  educations: AcademicCapIcon,
  projects: LightBulbIcon,
  skills: WrenchIcon,
  custom: WrenchIcon,
};

export const Form = ({
  form,
  addButtonText,
  children,
}: {
  form: ShowForm;
  addButtonText?: string;
  children: React.ReactNode;
}) => {
  const showForm = useAppSelector(selectShowByForm(form));
  const heading = useAppSelector(selectHeadingByForm(form));
  const dispatch = useAppDispatch();

  const setShowForm = (showForm: boolean) => {
    dispatch(changeShowForm({ field: form, value: showForm }));
  };
  const setHeading = (heading: string) => {
    dispatch(changeFormHeading({ field: form, value: heading }));
  };

  const isFirstForm = useAppSelector(selectIsFirstForm(form));
  const isLastForm = useAppSelector(selectIsLastForm(form));

  const handleMoveClick = (type: "up" | "down") => {
    dispatch(changeFormOrder({ form, type }));
  };

  const Icon = FORM_TO_ICON[form];

  return (
    <BaseForm
      className={`transition-opacity duration-300 ${
        showForm ? "pb-6" : "pb-3 opacity-70"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex grow items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="h-6 w-6 text-[var(--theme-gold)]" aria-hidden="true" />
          </motion.div>
          <input
            type="text"
            className="w-full border-b border-transparent text-lg font-semibold text-[var(--theme-gray)] outline-none focus:border-[var(--theme-gold)] focus:ring-2 focus:ring-[var(--theme-gold)]/50 rounded-md px-2 py-1 transition-all duration-200"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1">
          {!isFirstForm && (
            <MoveIconButton type="up" onClick={handleMoveClick} />
          )}
          {!isLastForm && (
            <MoveIconButton type="down" onClick={handleMoveClick} />
          )}
          <ShowIconButton show={showForm} setShow={setShowForm} />
        </div>
      </div>
      <ExpanderWithHeightTransition expanded={showForm}>
        {children}
      </ExpanderWithHeightTransition>
      {showForm && addButtonText && (
        <motion.div
          className="mt-3 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            type="button"
            onClick={() => dispatch(addSectionInForm({ form }))}
            className="flex items-center rounded-lg bg-[var(--theme-secondary-blue)] px-4 py-2 text-sm font-medium text-[var(--theme-gold)] shadow-sm hover:bg-[var(--theme-secondary-blue)]/80 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlusSmallIcon
              className="mr-1.5 h-5 w-5 text-[var(--theme-gold)]"
              aria-hidden="true"
            />
            {addButtonText}
          </motion.button>
        </motion.div>
      )}
    </BaseForm>
  );
};

export const FormSection = ({
  form,
  idx,
  showMoveUp,
  showMoveDown,
  showDelete,
  deleteButtonTooltipText,
  children,
}: {
  form: ShowForm;
  idx: number;
  showMoveUp: boolean;
  showMoveDown: boolean;
  showDelete: boolean;
  deleteButtonTooltipText: string;
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteSectionInFormByIdx({ form, idx }));
  };
  const handleMoveClick = (direction: "up" | "down") => {
    dispatch(moveSectionInForm({ form, direction, idx }));
  };

  return (
    <>
      {idx !== 0 && (
        <motion.div
          className="my-4 border-t-2 border-dashed border-[var(--theme-secondary-blue)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <div className="relative grid grid-cols-6 gap-4">
        {children}
        <motion.div
          className="absolute right-0 top-0 flex gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            className={`transition-all duration-300 ${
              showMoveUp ? "" : "invisible opacity-0"
            } ${showMoveDown ? "" : "-mr-6"}`}
            animate={{ x: showMoveUp ? 0 : -10 }}
          >
            <MoveIconButton
              type="up"
              size="small"
              onClick={() => handleMoveClick("up")}
            />
          </motion.div>
          <motion.div
            className={`transition-all duration-300 ${
              showMoveDown ? "" : "invisible opacity-0"
            }`}
            animate={{ x: showMoveDown ? 0 : -10 }}
          >
            <MoveIconButton
              type="down"
              size="small"
              onClick={() => handleMoveClick("down")}
            />
          </motion.div>
          <motion.div
            className={`transition-all duration-300 ${
              showDelete ? "" : "invisible opacity-0"
            }`}
            animate={{ x: showDelete ? 0 : -10 }}
          >
            <DeleteIconButton
              onClick={handleDeleteClick}
              tooltipText={deleteButtonTooltipText}
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};