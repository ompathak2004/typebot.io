import { Flex, type FlexProps, useColorModeValue } from "@chakra-ui/react";
import { isDefined } from "@typebot.io/lib/utils";
import type React from "react";
import { forwardRef } from "react";
import { useHoverExpandDebounce } from "../../hooks/useHoverExpandDebounce";

type Props = {
  isVisible?: boolean;
  isExpanded?: boolean;
  initialHeightPixels?: number;
  expandedHeightPixels?: number;
  initialPaddingPixel?: number;
  expandedPaddingPixel?: number;
  children?: React.ReactNode;
  onClick?: () => void;
} & FlexProps;

export const PlaceholderNode = forwardRef<HTMLDivElement, Props>(
  (
    {
      isVisible,
      isExpanded,
      initialHeightPixels = 8,
      expandedHeightPixels = 36,
      initialPaddingPixel = 0,
      expandedPaddingPixel = 6,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const {
      isExpanded: isHoverExpanded,
      isHovered,
      onHover,
      onLeave,
      onAbort,
    } = useHoverExpandDebounce({
      enabled: isDefined(onClick),
    });

    return (
      <Flex
        role="button"
        ref={ref}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        opacity={isVisible || isHovered ? 1 : 0}
        transition="opacity 200ms"
        fontWeight="semibold"
        fontSize="small"
        justify="center"
        align="center"
        onMouseUpCapture={onAbort}
        onClick={onClick}
        py={
          isExpanded || isHoverExpanded
            ? expandedPaddingPixel + "px"
            : initialPaddingPixel + "px"
        }
        {...props}
      >
        <Flex
          bgColor={useColorModeValue("gray.200", "gray.800")}
          w="full"
          rounded="lg"
          justify="center"
          align="center"
          h={
            isExpanded || isHoverExpanded
              ? expandedHeightPixels + "px"
              : initialHeightPixels + "px"
          }
          transition={
            isDefined(onClick) || isVisible ? "height 200ms" : undefined
          }
        >
          {isHovered && isHoverExpanded ? children : null}
        </Flex>
      </Flex>
    );
  },
);

PlaceholderNode.displayName = "PlaceholderNode";
