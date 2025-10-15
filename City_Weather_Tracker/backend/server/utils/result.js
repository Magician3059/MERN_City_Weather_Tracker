export function createResult(error, data) {
  if (data)
    return createSuccessResult(data);
  else
    return createErrorResult(error);
}

export function createSuccessResult(data) {
  return { status: "success", data: data };
}

export function createErrorResult(error) {
  return { status: "error", error: error };
}

export default { createResult, createErrorResult, createSuccessResult };
